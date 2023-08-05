import { SecondaryButton } from "@/components/Element/Button";
import { useDispatch } from "react-redux";
import { setLogout } from "..";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    dispatch(setLogout());
    navigate("/");
  };

  return (
    <SecondaryButton
      restProps={{
        onClick: handleClickLogout,
      }}
    >
      Logout
    </SecondaryButton>
  );
};
