import { AnimatePresence, motion } from 'framer-motion';
import { BsMailboxFlag } from 'react-icons/bs';

import { FiHome } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { useState } from 'react';
import { LuLogOut } from 'react-icons/lu';
import Topbar from './Topbar';

const sideItems = [
    {
        path: '/',
        text: 'Home',
        icon: <FiHome />,
    },
    {
        path: '/list',
        text: "Mails",
        icon: <BsMailboxFlag />,
    },
    
    {
        path: '/logout',
        text: "Logout",
        icon: <LuLogOut />
    }

];

const anime = {
    hide: {
        width: 0,
        opacity: 0,
        transition: {
            duration: 0.5,
        }
    },
    show: {
        width: 'auto',
        opacity: 1,
        transition: {
            duration: 0.5,
        }
    }

}

// eslint-disable-next-line react/prop-types, @typescript-eslint/no-explicit-any
const Sidebar = ({ children }: any) => {
    const [open, setOpen] = useState(false);
    const tapIt = () => setOpen(!open);

    return (
        <div className='text-white flex text-2xl'>
            <motion.div animate={{
                width: open ? "150px" : "45px",
                transition: {
                    duration: 0.8,
                    type: "spring",
                    damping: 6
                }
            }} className='h-screen bg-blue-800'>
                <header className='flex p-2 mb-4 whitespace-nowrap '>
                    <FaBars onClick={tapIt} />
                    {open && <motion.h1
                        variants={anime}
                        initial='hide'
                        animate='show'
                        exit='hide'
                        className='pl-2'>MailBox</motion.h1>}

                </header>
                
                <section className='flex pr-4 p-2 flex-col'>
                    {
                        sideItems.map(item => (
                            <NavLink to={item.path} key={item.text}
                                className= {(isActive)=> isActive ? " mr-2 mb-2 flex pr-2 hover:text-green-200 ":"mr-2 mb-2 flex pr-2 hover:text-green-200"}
                                >
                                <div>{item.icon}</div>
                                {open && (<AnimatePresence>
                                    <motion.div
                                        variants={anime}
                                        initial='hide'
                                        animate='show'
                                        exit='hide'
                                        className='pl-2 whitespace-nowrap'>{item.text}</motion.div>
                                </AnimatePresence>)}
                            </NavLink>
                        ))
                    }
                </section>
            </motion.div>
            <main className='text-gray-700 p-4'>
                <Topbar/>
                {children}
            </main>
        </div>
    )
}

export default Sidebar;