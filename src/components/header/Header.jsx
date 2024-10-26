import Dropdown from 'react-bootstrap/Dropdown';
import lock from '../../assets/lock.png';
import logout from '../../assets/logout.png';
import profilepic from '../../assets/profilepic.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
const Header = (props) => {
    let name = props.userName;
    const navigate=useNavigate()
 
    const log =()=>{
        sessionStorage.removeItem('token');
        
        setTimeout (() =>
            {  Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Successfully Loggedout",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });},3000);
        navigate('/login');
       
    } 

    return (
        <div className='shadow'>
        <Dropdown>
            <Dropdown.Toggle variant="bg-secondary border py-1  mb-2 mt-2 bg-light bg-opacity-10 m-0" id="dropdown-basic">
                <img className="rounded-circle text-start p-0 mx-2" src={profilepic} width={20} height={20} alt='hotdeck_image' /> {name}
            </Dropdown.Toggle>
            <Dropdown.Menu variant=" white shadow   border-white m-0 p-0 ">
                <Dropdown.Item as='span'><img className="" src={profilepic} width={18} height={18} alt='hotdeck_image' />
                    <Link className='text-decoration-none text-dark' to='/myprofile' >My profile </Link>
                </Dropdown.Item>
                <Dropdown.Item as="span">
                    <img className="" src={lock} width={18} height={18} alt='hotdeck_image' /> Change Password
                </Dropdown.Item>
                <Dropdown.Item as="span">
                   <Button variant='none p-0' onClick={log}>  <img className="" src={logout} width={18} height={18} alt='hotdeck_image' />
                   Logout</Button>
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
        </div>
    );
}
export default Header;
