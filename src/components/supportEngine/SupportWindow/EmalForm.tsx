import React, { useState } from 'react';
import { styles } from '../supportEngine';
import { LoadingOutlined } from '@ant-design/icons';
import Avatar from '../Avatar';
import axios from 'axios';


interface EmailFormProps {
    setUser: (user: any) => void;
    setChat: (chat: any) => void;
    visible: boolean;
  }
  const EmailForm: React.FC<EmailFormProps> = (props) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  function getOrCreateUser(callback: (user: any) => void) {
    axios
      .put(
        'https://api.chatengine.io/users/',
        {
          "username":email,
          "secret":email,
          "email":email,
        },
        {
          headers: { 'Private-key': import.meta.env.VITE_CE_PRIVATE_KEY },
        }
      )
      .then((res) => {
        
        callback(res.data);
      })
      .catch((error) => {
        console.error('User creation error:', error);
      });
  }
  
  
  function getOrCreateChat(callback: (chat: any) => void){
    console.log('import.meta.env.VITE_CE_PRIVATE_KEY',import.meta.env.VITE_CE_PRIVATE_KEY);
    
    axios.put(
        'https://api.chatengine.io/chats/',
        {
            "usernames":["Faizu Rahman",email],
             "is_direct_chat":true  
        },{
            headers:{'Private-key':import.meta.env.VITE_CE_PRIVATE_KEY}
        }
       ).then(res=> {
        console.log('Chat response:', res);
        const chatData = {
          id: res.data.id,
          chatID: res.data.id,
          chatAccessKey: res.data.access_key,
        };
  
        callback(chatData);
      })
        .catch((error) => {
            console.error('Chat error:', error);
          });
  }
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    getOrCreateUser((user) => {
      props.setUser(user);
      getOrCreateChat((chat) => {
        props.setChat(chat);
      });
    });
  }
  

  return (
    <div
      style={{
        ...styles.emailFormWindow,
        height: props.visible ? '100%': '0%',
        opacity: props.visible ? '1':'0', 
      }}
    >
      <div style={{ height: '0px' }}>
        <div style={styles.stripe} />
      </div>
      <div
        className='transition-5'
        style={{
          ...styles.loadingDiv,
          zIndex: loading ? '10' : '-1',
          opacity: loading ? '0.33' : '0',
        }}
      />

      <LoadingOutlined 
      classID='tansition-5'
      style={{
        ...styles.loadingIcon,
        ...{
            zIndex: loading ? '10' : '-1',
            opacity: loading ? '1' : '0',
            fontSize:'82px',
            top: `calc(50% - 41px)`, 
            left: `calc(50% - 41px)`,
            color:'blue'
        }
      }}/>
      <div style={{position:'absolute',height:'100%',width:'100%',textAlign:'center'}}>
         <Avatar
         style={{position:'relative',
         left: `calc(50% - 44px)`,
         top:'10%'}}/>
      <div style={styles.topText}>
         Welcome to my <br/> Support 👋
      </div>
      <form  
      onSubmit={(e)=>handleSubmit(e)}
      style={{position:'relative',width:'100%',top:'19.75%'}}>
        <input
        style={styles.emailInput}
        onChange={(e)=>setEmail(e.target.value)}
        placeholder=' Your Email'/>
      </form>
      <div style={styles.bottomText}>
        Enter your email <br/> to get started
      </div>
      </div>
    </div>
  );
};

export default EmailForm;
