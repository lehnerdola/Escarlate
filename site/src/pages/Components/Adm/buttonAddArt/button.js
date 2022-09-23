import './index.scss'
import { motion } from 'framer-motion'

export default function btAddArt(props){
    return(
        <div>
            <motion.button className='btAdd'
            whileHover={{ scale: 1.2 }}
            onHoverStart={e => {}}
            onHoverEnd={e => {}}
            ><p>{props.nome}</p></motion.button>
        </div>
    )
}