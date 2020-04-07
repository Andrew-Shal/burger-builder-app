import React, {useEffect} from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxilary/Auxilary';
import Backdrop from '../Backdrop/Backdrop';
import useIsMount from '../../../Utilities/UseIsMount';

const Modal = props => {
    const isMount = useIsMount();

    useEffect(() => {
        if(!isMount){
            console.log("[Modal] will update")
        }
    });

    return (<Auxiliary>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div className={classes.Modal} style={{transform: props.show ? 'translateY(0)': 'translateY(-100vh)', opacity: props.show ? '1':'0'}}>
            {props.children}
        </div>
    </Auxiliary>);
};
export default React.memo(Modal);