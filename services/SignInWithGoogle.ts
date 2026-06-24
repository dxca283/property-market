import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export const signinWithGoogle = async () => {
  try {
    await authClient.signIn.social({
        provider: "google"
    })
  } catch (error) {
    console.log("Something went wrong", error);
    toast.error("Google sign in failed");
  }
};
