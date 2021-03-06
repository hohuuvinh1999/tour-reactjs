import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import axios from 'axios';
import { actFetchItemsRequest } from './../actions/index';
import { actDeleteProductRequest } from './../actions/index';
import { connect } from 'react-redux';

class AdminList extends Component {
    Delete = (id) => {

        if (confirm('Bạn chắc chắn muốn xóa ?')) { //eslint-disable-line
            this.props.onDeleteProduct(id);
            console.log(id);
            axios.post(`https://localhost:44318/api/Tour/Delete`, {
                id: id
            })
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                })
        }
    }
    render() {

        var { item2, index } = this.props;
        return (
            <div style={{ width: '100%' }}>
                <div className="col-12 mt-2" style={{ width: '100%' }}>
                    <div className="float-left p-0" style={{ width: '160px' }}>
                        <img src={item2.image} width="100%" height="100%" />
                    </div>
                    <div className="float-right" style={{ width: 'calc(100% - 160px)', background: '#ccc' }}>
                        <p className="mb-1" style={{ width: '100%', }}>{item2.title}</p>
                        <p className="mb-1" style={{ width: '100%', }}>{item2.address}</p>
                        <NavLink exact to={`/chinh-sua/${item2.id}`}>
                            <div className="btn btn-primary">Sua</div>
                        </NavLink>

                        <div onClick={() => this.Delete(item2.id)} className="btn btn-primary">Xoa</div>

                    </div>
                    <div style={{ clear: 'both' }}></div>
                </div>
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        ItemRD: state.ItemRD
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onDeleteProduct: (id) => {
            dispatch(actDeleteProductRequest(id));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminList);