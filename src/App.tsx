import './App.scss';
import * as React from "react";
import { connect } from "react-redux";
import {
  setData,
  setSelectedUser,
  resetSelectedUser
} from "./actions/Actions";
import { getCall, deleteCall } from './api/Service';
import {
  Link
} from "react-router-dom";
import Modal from './Modal';
import Header from './Header';

interface Person {
  avatar: string
  first_name: string
  last_name: string
  email: string
  id: number
}
interface Props {
  data: Array<Person>
  setData: Function
  setSelectedUser: Function
  resetSelectedUser: Function
}


const App = (props: Props) => {

  React.useEffect(() => {
    const get = async () => {
      const { data: { data } } = await getCall('/api/users?page=1');
      return data;
    }
    get().then((response) => {
      props.setData(response);
    })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  const displayModal = () => {
    var modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "block";
    }
  }
  const closeModal = (e: any) => {
    if (e.target.id !== 'modal-content' && e.target.id !== 'circle' && e.target.id !== 'circle-image' && e.target.id !== 'buttons') {
      var modal = document.getElementById("myModal");
      if (modal) {
        modal.style.display = "none";
        props.resetSelectedUser();
      }
    }
  }
  const editUser = (id: number) => {
    props.setSelectedUser(id);
    displayModal();
  };

  const deleteAsync = (id:number) => {
    const deleteFunc = async () => {
      const { data: { data } } = await deleteCall('/api/users/' + id);
      return data;
    }
    deleteFunc().then((response) => {
      var newData = props.data.map((u: any) => {
        if (u.id !== id) {
          return u;
        }
      }).filter((u: any) => u !== undefined);
      props.setData(newData);
    })
      .catch((error) => {
        console.log(error)
      });
  }
  const renderList = (list: any) => {
    return list.map((person: any, index: any) => (
      <div className="element" key={index}>
        <Link to={`/user/${person.id}`}>
          <img src={person.avatar} />
          <p className="name">{`${person.first_name} ${person.last_name}`}</p>
          <p className="mail">{person.email}</p>
        </Link>
        <div id="buttons" className="buttons">
          <button id="buttons" className="button edit" onClick={() => editUser(person.id)}>Edit</button>
          <button id="buttons" className="button delete" onClick={() => deleteAsync(person.id)}>Delete</button>
        </div>
      </div>
    ))
  }
  return (
    <div onClick={(e) => closeModal(e)}>
      <Header msg={"Contact list"} />
      <label id="circle" className="circle" onClick={() => displayModal()}>
        <img id="circle-image" src="https://ssl.gstatic.com/bt/C3341AA7A1A076756462EE2E5CD71C11/2x/btw_ic_speeddial_white_24dp_2x.png" alt="" />
      </label>
      <div className="list">
        {
          props.data && renderList(props.data)
        }
      </div>
      <Modal />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    data: state.counter.data
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setData: (data: Array<Person>) => dispatch(setData(data)),
    setSelectedUser: (id: number) => dispatch(setSelectedUser(id)),
    resetSelectedUser: () => dispatch(resetSelectedUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
