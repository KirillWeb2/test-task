import { FC, useCallback } from "react";
import { useForm } from "react-hook-form";

import axios from "../axios";

interface FormProps {
  toggleAddMessageForm: () => void;
  refetch: () => void;
}

export const Form: FC<FormProps> = ({ toggleAddMessageForm, refetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        await axios.post("/messages/create", data);
        refetch();
        reset();
      } catch (error) {
        console.log(error);
      }
    },
    [refetch, reset]
  );

  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="form__title">Форма добавления сообщения</h1>
      <div className="form__item">
        <input
          className="input"
          type="text"
          placeholder="Имя пользователя"
          {...register("username", { required: true })}
        />
        {errors.username && <span>Username field is required</span>}
      </div>
      <div className="form__item">
        <input
          className="input"
          type="email"
          placeholder="Почта"
          {...register("email", { required: true })}
        />
        {errors.email && <span>Email field is required</span>}
      </div>
      <div className="form__item">
        <input
          type="text"
          className="input"
          placeholder="Home page"
          {...register("homepage", {})}
        />
      </div>
      <div className="form__item">
        <textarea
          className="textarea"
          placeholder="Сообщение"
          {...register("text", { required: true })}
        ></textarea>
        {errors.text && <span>Text field is required</span>}
      </div>
      <div className="form__btns">
        <button className="btn" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Отправка..." : "Отправить"}
        </button>
        <button
          className="btn"
          disabled={isSubmitting}
          type="button"
          onClick={handleReset}
        >
          Очистить
        </button>
        <button
          className="btn"
          disabled={isSubmitting}
          type="button"
          onClick={toggleAddMessageForm}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};
