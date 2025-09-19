import { ToastContainer } from "react-toastify";
import GradientGenerator from "./projects/01_gradient_generator";
import AvatarGenerator from "./projects/02_avatar_generator";

const App = () => {
  return (
    <>
      {/* <GradientGenerator /> */}
      <AvatarGenerator />
      <ToastContainer />
    </>
  );
};

export default App;
