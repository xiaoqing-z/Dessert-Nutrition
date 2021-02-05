import React, { ReactNode } from "react";
import panel from "./style";
import { Link } from 'react-router-dom';
import Button from "../Button/Button"


function Panel({ ...props }) {
    return (
        <div className={panel.basic}>
            <div className={panel.selected}>{props.ids.length} selected</div>
            <div className="dtc tr">
                <div className="dib">
                    <Link to='/add'>
                        <Button type="add"><i className="fas fa-plus mr1"></i>ADD NEW</Button>
                    </Link>
                </div>
                <div className="dib pr3">
                    <Button type="delete" onClick={props.handleDelete}><i className="far fa-trash-alt mr1"></i>DELETE</Button>
                </div>

            </div>
        </div>
    );
}

export default Panel;
