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

  return "hello";
}
