import { GuestLayout } from "@/components/layouts";
import { NextPageWithLayout } from "@/types/next";

const Login: NextPageWithLayout = () => {
  return <div>LOGIN</div>;
};

Login.getLayout = (page) => {
  return <GuestLayout>{page}</GuestLayout>;
};

export default Login;
