import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledTextInput from "../input/controlled-text";
import { useMutation } from "react-query";
import { SignUpSchema, signUp, signUpSchema } from "@/api/auth";
import { Button, Spinner, tokens } from "@fluentui/react-components";
import { Key, Send, User } from "lucide-react";
import FormInputContainer from "./form-input-container";
import FormActionContainer from "./form-action-container";

const defaultForm: SignUpSchema = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm(): ReturnType<React.FC> {
  const methods = useForm<SignUpSchema>({
    defaultValues: defaultForm,
    resolver: zodResolver(signUpSchema),
  });

  const { handleSubmit } = methods;

  const submitMutation = useMutation({
    mutationFn: signUp,
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
          <ControlledTextInput<SignUpSchema, "username">
            name="username"
            label="Username"
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
          <ControlledTextInput<SignUpSchema, "email">
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
          <ControlledTextInput<SignUpSchema, "password">
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
          <ControlledTextInput<SignUpSchema, "confirmPassword">
            name="confirmPassword"
            label="Confirm Password"
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
            placeholder="Confirm Password"
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
