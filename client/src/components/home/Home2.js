import React, { Component } from 'react'
import './HomeStyles.css';

export default class Home2 extends Component {
  render() {
    return (
      <div>
        <h1 className = "text-light text-center ">Nector</h1>
        <div className = "container faq">
        <div className = "col" >
        
        <h5 className = "text-light ">FAQ(feel free to submit questions in chat):</h5>
        <br></br>
        <h5 className = "text-light ">What is Nector?</h5>
        <p className = "text-light">Nector is a social networking app/website</p>

        <br></br>
        <h5 className = "text-light ">What is the purpose?</h5>
        <p className = "text-light">The goal of nector in the simplest terms is to connect people(conNECTOR),
        with themselves, with others, with the world around them, etc.  
        </p>

        <p className = "text-light">The first phase and focus is about 
        just matching users with others based on shared interests or other search criteria like geographic location.
        </p>

        

        <br></br>
        <h5 className = "text-light ">How does it compare with other social apps?</h5>
        <p className = "text-light">Right now nector is like your personal contacts on your phone
        except: 
        
        </p>
        <p className = "text-light">-more information and a more in depth profile can be created for each person
        
        </p>

        
        <p className = "text-light">-these contacts can be
        more easily queried and shared with other friends 
        </p>

        <p className = "text-light">This makes it much easier to organize your friends, as well as to meet new friends
        </p>


        </div>
        </div>
        

        
      </div>
    )
  }
}
