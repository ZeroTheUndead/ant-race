import './Header.css';

function Header(props: { 
  title: string,
  size: string, 
}) {

  const renderHeader = (title: string, size: string) => {
    let result = null;
    switch(size) {
      case 'small':
        result = <h3>{title}</h3>
        break;
      case 'medium':
        result = <h2>{title}</h2>
        break;
      case 'large':
        result = <h1>{title}</h1>
          break;
      default:
        result = <></>
    }
    return result;
  };

  const { title, size } = props; 
  return renderHeader(title, size);
}

export default Header;
