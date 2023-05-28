import { Controller, useForm } from "react-hook-form";
import { Button, Card, Text, TextInput, useToaster } from "@gravity-ui/uikit";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@features/auth/sign-in";
import { Icon28UserCircleOutline } from "@vkontakte/icons";
import s from "./Form.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { LoginDto, userActions } from "@entities/user";
import { AxiosError } from "axios";
import { api } from "@shared";
import Cookies from "js-cookie";
import { useAppDispatch } from "@app/providers";

export const SignInForm = () => {
  const { add } = useToaster();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoginDto>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (dto: LoginDto) => {
    try {
      const formData = new FormData();
      formData.append("username", dto.username);
      formData.append("password", dto.password);

      const { data } = await api.post("token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const token = data.access_token;
      const expires = new Date(new Date().getTime() + data.expiration_time * 1000);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const { data: user } = await api.get("me");

      Cookies.set("access_token", token, {
        expires,
        secure: true,
        sameSite: "none",
      });

      dispatch(userActions.setToken({
        token,
        expires,
      }));
      dispatch(userActions.setUser(user));
      navigate("/");
    } catch (e) {
      const err = e as AxiosError;
      add({
        name: "Ошибка",
        title: err?.message ?? "Произошла ошибка при авторизации пользователя",
        type: "error",
      });
    }
  };

  return (
    <Card className={s.form}>
      <header className={s.form__header}>
        <Icon28UserCircleOutline />
        <Text variant={"subheader-3"}>Войти в личный кабинет</Text>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={s.form__fields}>
          <Controller control={control} name={"username"}
            render={({ field, fieldState: { error }  }) => (
              <div>
                <Text as={"label"} variant={"subheader-1"}>
                  Электропочта
                  <span className={s.form__fields_required} />
                </Text>
                <TextInput
                  {...field}
                  error={error?.message}
                  placeholder={"johndoe@icloud.com"}
                  size={"l"}
                  type={"email"} />
              </div>
            )} />
          <Controller control={control} name={"password"}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Text as={"label"} variant={"subheader-1"}>
                  Пароль
                  <span className={s.form__fields_required} />
                </Text>
                <TextInput
                  {...field}
                  error={error?.message}
                  placeholder={"********"}
                  size={"l"}
                  type={"password"} />
              </div>
            )} />
        </section>

        <Button className={s.form__button} size={"l"} type={"submit"} view={"action"} width={"max"}>
          Войти
        </Button>
      </form>

      <span className={s.form__delimitter} />

      <footer className={s.form__footer}>
        <Link to={"/auth/signup"}>
          <Button className={s.form__footer_button} view={"flat"}>
            Создать аккаунт
          </Button>
        </Link>
      </footer>
    </Card>
  );
};
