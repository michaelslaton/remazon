import "./divider.css";

type DividerProps = {
  vertical?: boolean;
  grey?: boolean;
}

const Divider: React.FC<DividerProps> = ({ vertical=false, grey=false }) => {

  return (
    <div className={`divider ${vertical ? "vertical" : ""} ${grey ? "grey" : ""}`}/>
  );
};

export default Divider;