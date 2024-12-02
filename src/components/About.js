import UserClass from './UserClass.js';

const AboutComponent = () =>{
    return (
        <div>
            <h1>About Us</h1>
            <h4>It is a new-age consumer-first organization offering an easy-to-use convenience platform, accessible through a unified app.</h4>
            <UserClass name={'Lucky Dubey'} location={'Mumbai'}/>
        </div>
    )
}

export default AboutComponent; 