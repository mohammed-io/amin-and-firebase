import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Firebase from 'firebase';

const FireApp = Firebase.initializeApp({
  apiKey: "AIzaSyB0vDwgxVbYCqufBY06mo-Ji5G7QXwffcQ",
  authDomain: "playing-with-firestore-ea560.firebaseapp.com",
  databaseURL: "https://playing-with-firestore-ea560.firebaseio.com",
  projectId: "playing-with-firestore-ea560",
  storageBucket: "playing-with-firestore-ea560.appspot.com",
  messagingSenderId: "474404060227"
});

const Firestore = FireApp.firestore();
Firestore.settings({timestampsInSnapshots: true})

class App extends Component {

  state = {
    list: []
  }

  componentDidMount() {
    Firestore.collection('testing').where('to', '==', 'amin')
    //Firestore.collection('testing')
      .onSnapshot(snap => {
        this.setState({
          list: snap.docs.map(doc => {
            return {
              ...doc.data(),
              id: doc.id
            }
          })
        })
      })
  }

  getColumnsFromObject = obj => {
    return Object.keys(obj).map(x => (
      <td>{obj[x]}</td>
    )).concat(<td><button onClick={() => this.delete(obj.id)}>Delete</button></td>)
  }

  delete = id => {
    Firestore.collection('testing')
      .doc(id).delete();
  }
  pushRandom = () => {
    Firestore.collection('testing')
      .add({
        text: Math.random() * 1000
      })
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.pushRandom}>Add Random</button>
        <table>
          {
            this.state.list.map(x => <tr>{this.getColumnsFromObject(x)}</tr>)
          }
        </table>

        
        My Messages: 
        <ul>
          {
            this.state.list.filter(m => m.to === "amin")
              .map(m => (
                <li>{m.text}</li>
              ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
