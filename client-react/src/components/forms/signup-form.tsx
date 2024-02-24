import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import ControlledTextInput from "../input/controlled-text";
import { useMutation } from "react-query";
import { login } from "@/api/auth";
import { Button, Spinner, tokens } from "@fluentui/react-components";
import { Key, Send, User } from "lucide-react";
import FormInputContainer from "./form-input-container";
import FormActionContainer from "./form-action-container";

const schema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type Schema = z.infer<typeof schema>;

const defaultForm: Schema = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm(): ReturnType<React.FC> {
  const methods = useForm<Schema>({
    defaultValues: defaultForm,
    resolver: zodResolver(schema),
  });

  const { handleSubmit } = methods;

  const submitMutation = useMutation({
    mutationFn: (data: Schema) => login(data.email, data.password),
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
          <ControlledTextInput<Schema, "username">
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
          <ControlledTextInput<Schema, "email">
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
          <ControlledTextInput<Schema, "password">
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
          <ControlledTextInput<Schema, "confirmPassword">
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
