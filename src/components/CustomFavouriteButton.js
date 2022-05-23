import React from 'react';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';
import { status, json } from '/utilities/requestHandlers';
import UserContext from '../contexts/user';

class CustomFavouriteButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.selected,
            userid: props.userid,
            dogid: props.dogid
        };
        this.onClick = this.onClick.bind(this);
    }

    static contextType = UserContext;

    componentDidMount() {
        var sql = "";
        fetch(this.props.countLink)
            .then(status)
            .then(json)
            .then(count => {
                console.log('this.coutLink ', this.props.countLink);
                this.setState({ count: count })
            })
            .catch(err => {

                console.log(`${this.props.type} icon error for post ${this.props.type} `)
            });
    }


    postLike() {
        if (this.props.type == 'like' && this.context.user.username != "undefined") {
            console.log(`logging in user: ${this.context.user.username} password: ${this.context.user.password}`)
            return (fetch(this.props.countLink, {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + btoa(`${this.context.user.username}:${this.context.user.password}`)
                }
            }).then(status)
                .then(json)
                .then(alert("Post liked"))
                .catch(err => {
                    console.log(`${this.props.type} Check network problems pls. ${this.props.id}`);
                    alert("Check network problems");
                })
            )
        }
    };







    onClick() {
        //reverse the selected state with every click
        this.setState({ selected: !this.state.selected });
        //need to post count to API server database in table articleslikes with articleid and userid => need to login like and dislike posts
        if ((this.context.user.loggedIn == false) && (this.props.type == 'like'))
            alert("Pls. login before clicking 'like'")
        else this.postLike();
    }



    render() {
        const theme = this.state.selected ? 'filled' : 'outlined';
        const iconType = this.props.type;
        const Icon = getIcon(theme, iconType);

        return (

            <span>
                <Icon
                    onClick={this.onClick}
                    style={{ color: 'steelblue' }} />
                {this.state.count}
            </span>


        );
    }

}
export default CustomFavouriteButton;
