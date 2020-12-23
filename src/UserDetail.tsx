import * as React from "react";
import {
  useHistory,
  withRouter
} from "react-router-dom";
import { getCall } from './api/Service';
import Header from './Header';

interface Person {
  avatar: string
  first_name: string
  last_name: string
  email: string
  id: number
}

const UserDetail = () => {
  const id = useHistory().location.pathname.split('/')[2];
  const [person, setPerson] = React.useState({} as Person);
  React.useEffect(() => {
    const getDetails = async () => {
      const { data: { data } } = await getCall('/api/users/'+id);
      return data;
    }
    getDetails().then((response) => {
      console.log('response', response);
      setPerson(response);
    });
  }, []);
  return (
    <div>
      <Header msg="User details"/>
      {person && <div className="element">
          <img src={person.avatar} />
          <p className="name">{`${person.first_name} ${person.last_name}`}</p>
          <p className="mail">{person.email}</p>
      </div>}
    </div>
  )
}
export default withRouter(UserDetail);