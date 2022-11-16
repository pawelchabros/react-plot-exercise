import { useEffect } from "react";

const useButton = ({ onClick, id }) => {
  useEffect(() => {
    document.getElementById(id)?.addEventListener("click", onClick);
  }, [onClick, id]);
}

export default useButton;
