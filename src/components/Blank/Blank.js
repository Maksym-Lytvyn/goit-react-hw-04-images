import BlankCSS from './Blank.module.css';

const Blank = ({ blankMessage }) => {
  return <div className={BlankCSS.blank_styled}>{blankMessage}</div>;
}
export default Blank;
