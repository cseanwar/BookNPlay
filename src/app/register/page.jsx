"use client";
import { FcGoogle } from "react-icons/fc";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import toast from "react-hot-toast";
import { User, Link2, Mail, Lock } from "lucide-react";

const RegisterPage = () => {
  const passwordRef = useRef("");

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      await authClient.signOut();
      toast.success("Congratulations!!! You have signed up successfully");
      redirect("/login");
    }

    if (error) {
      toast.error("Signup failed");
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white py-10 px-4 overflow-x-hidden">
      {/* Header */}
      <div className="text-center mb-6 w-full max-w-lg px-2">
        <h1 className="text-4xl md:text-5xl text-[#0C0B0B] mb-2 wrap-break-word">
          Create Account
        </h1>
        <p className="text-[#6C696D] text-base md:text-lg wrap-break-word">
          Start your adventure with BookNPlay
        </p>
      </div>

      {/* Form container */}
      <div className="w-full max-w-lg border border-gray-200 shadow-sm p-6 md:p-10">
        <Form
          onSubmit={onSubmit}
          className="flex flex-col gap-4"
          style={{ width: "100%" }}
        >
          {/* Full Name */}
          <TextField isRequired name="name" type="text" className="w-full mb-1">
            <Label className="text-[#0C0B0B] font-medium text-base md:text-lg">
              Full Name
            </Label>
            <div className="relative w-full">
              <User
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
              />
              <Input
                className="rounded-none bg-[#F8FAFC] text-sm text-[#6C696D] pl-9"
                style={{ width: "100%" }}
                placeholder="Enter your name"
              />
            </div>
            <FieldError />
          </TextField>

          {/* Image URL */}
          <TextField name="image" type="url" className="w-full mb-1">
            <Label className="text-[#0C0B0B] font-medium text-base md:text-lg">
              Image URL
            </Label>
            <div className="relative w-full">
              <Link2
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
              />
              <Input
                className="rounded-none bg-[#F8FAFC] text-sm text-[#6C696D] pl-9"
                style={{ width: "100%" }}
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full mb-1"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                return "Please enter a valid email address";
              return null;
            }}
          >
            <Label className="text-[#0C0B0B] font-medium text-base md:text-lg">
              Email Address
            </Label>
            <div className="relative w-full">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
              />
              <Input
                className="rounded-none bg-[#F8FAFC] text-sm text-[#6C696D] pl-9"
                style={{ width: "100%" }}
                placeholder="john@example.com"
              />
            </div>
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            className="w-full mb-1"
            validate={(value) => {
              if (value.length < 6)
                return "Password must be at least 8 characters";
              if (!/[A-Z]/.test(value))
                return "Password must contain at least one uppercase letter";
              if (!/[a-z]/.test(value))
                return "Password must contain at least one lowercase letter";
              if (!/[0-9]/.test(value))
                return "Password must contain at least one number";
              return null;
            }}
          >
            <Label className="text-[#0C0B0B] font-medium text-base md:text-lg">
              Password
            </Label>
            <div className="relative w-full">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
              />
              <Input
                className="rounded-none bg-[#F8FAFC] text-sm text-[#6C696D] pl-9"
                style={{ width: "100%" }}
                placeholder="Create a password"
                onChange={(e) => (passwordRef.current = e.target.value)}
              />
            </div>
            <Description className="text-red-500 text-xs md:text-sm">
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* Confirm Password */}
          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            className="w-full mb-2"
            validate={(value) => {
              if (value !== passwordRef.current)
                return "Passwords do not match";
              return null;
            }}
          >
            <Label className="text-[#0C0B0B] font-medium text-base md:text-lg">
              Confirm Password
            </Label>
            <div className="relative w-full">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10"
              />
              <Input
                className="rounded-none bg-[#F8FAFC] text-sm text-[#6C696D] pl-9"
                style={{ width: "100%" }}
                placeholder="Confirm your password"
              />
            </div>
            <FieldError />
          </TextField>

          {/* Submit */}
          <Button
            className="rounded-none w-full bg-[#15A1BF] hover:bg-[#03485790] text-white text-base md:text-lg font-bold py-5 mt-2"
            style={{ width: "100%" }}
            type="submit"
          >
            Create Account
          </Button>
        </Form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5 w-full overflow-hidden">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="whitespace-nowrap text-sm text-[#6C696D] shrink-0">
            Or sign up with
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Google */}
        <Button
          onClick={handleGoogleSignin}
          variant="outline"
          className="w-full rounded-none py-5 font-semibold text-base md:text-lg mb-5"
          style={{ width: "100%" }}
        >
          <FcGoogle /> Sign In with Google
        </Button>

        {/* Sign in link */}
        <p className="text-[#6C696D] text-base text-center">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-[#15A1BF] font-semibold text-lg">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
