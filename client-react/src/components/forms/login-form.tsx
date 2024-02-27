import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "../input/controlled-text";
import { useMutation } from "react-query";
import { LoginSchema, login, loginSchema } from "@/api/auth";
import { Button, Spinner, tokens } from "@fluentui/react-components";
import { Key, Send, User } from "lucide-react";
import FormInputContainer from "./form-input-container";
import FormActionContainer from "./form-action-container";
import { useNavigate } from "react-router-dom";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";

const defaultForm: LoginSchema = {
  email: "",
  password: "",
};

export default function LoginForm(): ReturnType<React.FC> {
  const methods = useForm<LoginSchema>({
    defaultValues: defaultForm,
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const { handleSubmit } = methods;

  const submitMutation = useMutation({
    mutationFn: login,
    onSuccess: () => navigate("/"),
    onError: (error: ClientResponseError) => {
      console.error(error);
      toast.error("Login failed", {
        description: error.message,
      });
    },
  });

  const onSubmit = handleSubmit(
    (data) => submitMutation.mutate(data),
    (formErrors) => {
      console.error(formErrors);
    }
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <FormInputContainer>
          <ControlledTextInput<LoginSchema, "email">
            name="email"
            label="Email"
            type="email"
            required
            contentBefore={
              <User
                style={{
                  height: tokens.fontSizeBase300,
                  width: tokens.fontSizeBase300,
                }}
              />
            }
            appearance="filled-lighter"
            placeholder="Username"
          />
          <ControlledTextInput<LoginSchema, "password">
            name="password"
            label="Password"
            type="password"
            required
            contentBefore={
              <Key
                style={{
                  height: tokens.fontSizeBase300,
                  width: tokens.fontSizeBase300,
                }}
              />
            }
            appearance="filled-lighter"
            placeholder="Password"
          />
        </FormInputContainer>
        <FormActionContainer>
          <Button
            type="submit"
            appearance="primary"
            icon={submitMutation.isLoading ? <Spinner size="tiny" /> : <Send />}
            disabled={submitMutation.isLoading}
          >
            Submit
          </Button>
        </FormActionContainer>
      </form>
    </FormProvider>
  );
}
