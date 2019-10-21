import Highlight from "react-highlight.js";
import codeStyling from './code.module.css';

const Code = ({ children }) => <Highlight language='javascript' className={codeStyling.code} children={children} />;
export default Code;