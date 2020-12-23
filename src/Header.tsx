import * as React from "react";

interface Props{
  msg: string;
}
class Header extends React.Component<Props, {}>{
  render(){
    return (
      <div className="header"><span>{this.props.msg}</span></div>
    )
  }
}
export default Header;