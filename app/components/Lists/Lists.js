import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderRight from './Header/HeaderRight';
import AddListModal from './Modals/AddListModal';
import EditListModal from './Modals/EditListModal';
import ListsDisplayMode from './Views/ListsDisplayMode';
import ListsEditMode from './Views/ListsEditMode';
import { fetchListsData } from '../../redux/actions/lists';

// ---------------------------------------------------------------------------------------
// Styled components

import DefaultContainer from '../Common/Containers/DefaultContainer';

// ---------------------------------------------------------------------------------------
// Redux

@connect((store) => {
    return {
        editing: store.lists.editing
    }
})

class Lists extends Component {
    static navigationOptions = ({navigation}) => ({
        title: 'All Lists',
        headerStyle: {
            height: 85,
            paddingHorizontal: 3,
            backgroundColor: '#efefef'
        },
        headerTitleStyle: {
            fontSize: 22,
            color: '#4286f4'
        },
        headerRight: <HeaderRight />
    });

    componentDidMount() {
        this.props.dispatch(fetchListsData());
    }

    render() {
        let lists = <ListsDisplayMode navigation={this.props.navigation} />;

        if(this.props.editing) {
            lists = <ListsEditMode navigation={this.props.navigation} />;
        }

        return (
            <DefaultContainer>
                <AddListModal />
                <EditListModal />
                {lists}
            </DefaultContainer>
        );
    }
}

export default Lists;