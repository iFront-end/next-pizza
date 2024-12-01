import {useEffect, useState} from "react";

type Props = {
  behavior: "smooth" | "auto" | "instant",
  block: "end" | "center" | "nearest" | "start",
  inline: "nearest" | "start" | "end" | "center"
}

const useScrollIntoView = (props: Props): (id: string) => void => {
  const [params, setParams] = useState<Props>()

  useEffect(() => {
    setParams(props)
  }, []);

  return (id: string) => {
    document.getElementById(id)?.scrollIntoView(params)
  }
};

export default useScrollIntoView
