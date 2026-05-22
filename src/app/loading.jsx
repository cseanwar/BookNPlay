import { RingLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <div className="h-[85vh] flex items-center justify-center">
        <RingLoader color="#22C55E" />
    </div>
  );
};

export default LoadingPage;