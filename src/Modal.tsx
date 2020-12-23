import * as React from "react";
import { connect } from "react-redux";
import {
  setData
} from "./actions/Actions";
import { postCall, putCall } from './api/Service';

interface Person {
  avatar: string
  first_name: string
  last_name: string
  email: string
  id: number
}
const Modal = (props: any) => {
  const [person, setPerson] = React.useState({} as Person);
  const defaultAvatar = 'https://i.stack.imgur.com/l60Hf.png';
  const defaultState = { first_name: '', last_name: '', email: '', id: props.data.length + 1, avatar: defaultAvatar };

  React.useEffect(() => {
    if (props.selectedUser === 0) {
      setPerson(defaultState);
    } else {
      const person = props.data.filter((u: any) => u.id === props.selectedUser);
      setPerson(person[0]);
    }
  }, [props.selectedUser]);

  const postAsync = () => {
    const post = async () => {
      const { data: { data } } = await postCall('/api/users', { name: person.first_name, job: 'leader' });
      return data;
    }
    post().then((response) => {
      var newData = [...props.data, person];
      props.setData(newData);
    })
      .catch((error) => {
        console.log(error)
      });
  }

  const putAsync = () => {
    const put = async () => {
      const { data: { data } } = await putCall('/api/users/' + props.selectedUser, { name: person.first_name, job: 'leader' });
      return data;
    }
    put().then((response) => {
      var newData = props.data.map((u: any) => {
        if (u.id === props.selectedUser) {
          return person;
        } else {
          return u;
        }
      });
      props.setData(newData);
    })
      .catch((error) => {
        console.log(error)
      });
  }

  const sendData = () => {
    if (props.selectedUser === 0) {
      postAsync();
    } else {
      putAsync();
    }

  }
  return (
    <div id="myModal" className="modal">
      {person && Object.keys(person).length > 0 && <div id="modal-content" className="modal-content">
        <span id="modal-content">{props.selectedUser === 0 ? 'Insert new user' : 'Edit user'}</span>
        <div id="modal-content">
          <label id="modal-content">First name</label>
          <input id="modal-content" name="first_name" type="text" value={person.first_name} onChange={(e) => setPerson({ ...person, [e.target.name]: e.target.value })} />
        </div>
        <div id="modal-content">
          <label id="modal-content">Last name</label>
          <input id="modal-content" name="last_name" type="text" value={person.last_name} onChange={(e) => setPerson({ ...person, [e.target.name]: e.target.value })} />
        </div>
        <div id="modal-content">
          <label id="modal-content">E-mail</label>
          <input id="modal-content" name="email" type="text" value={person.email} onChange={(e) => setPerson({ ...person, [e.target.name]: e.target.value })} />
        </div>
        <div id="modal-content">
          <button onClick={() => sendData()}>Submit</button>
        </div>
      </div>
      }

    </div>
  )
}

const mapStateToProps = (state: any) => {
  return {
    data: state.counter.data,
    selectedUser: state.counter.selectedUser
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setData: (data: Array<Person>) => dispatch(setData(data)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

