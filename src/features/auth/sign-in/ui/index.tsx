import { Controller, useForm } from "react-hook-form";
import { Button, Card, Text, TextInput } from "@gravity-ui/uikit";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "@features/auth/sign-in";
import { Icon28UserCircleOutline } from "@vkontakte/icons";
import s from "./Form.module.scss";
import { Link } from "react-router-dom";

export const SignInForm = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Card className={s.form}>
      <header className={s.form__header}>
        <Icon28UserCircleOutline />
        <Text variant={"subheader-3"}>Войти в личный кабинет</Text>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <section className={s.form__fields}>
          <Controller control={control} name={"email"}
            render={({ field, fieldState: { error }  }) => (
              <div>
                <Text as={"label"} variant={"subheader-1"}>
                  Электропочта
                  <span className={s.form__fields_required} />
                </Text>
                <TextInput {...field} error={error?.message}  placeholder={"johndoe@icloud.com"} size={"l"} />
              </div>
            )} />
          <Controller control={control} name={"password"}
            render={({ field, fieldState: { error } }) => (
              <div>
                <Text as={"label"} variant={"subheader-1"}>
                  Пароль
                  <span className={s.form__fields_required} />
                </Text>
                <TextInput {...field} error={error?.message} placeholder={"********"} size={"l"} />
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
            Зарегистрироваться
          </Button>
        </Link>
      </footer>
    </Card>
  );
};
