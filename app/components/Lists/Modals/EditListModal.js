import React, {Component} from 'react';
import Modal from 'react-native-modal'
import { connect } from 'react-redux';
import { editList, closeEditModal } from '../../../redux/actions/lists';

// ---------------------------------------------------------------------------------------
// Styled components

import BaseModalWrapper from '../../Common/Modals/BaseModalWrapper';
import BaseModalInputWrapper from '../../Common/Modals/BaseModalInputWrapper';
import BaseModalInput from '../../Common/Modals/BaseModalInput';
import BaseModalButtons from '../../Common/Modals/BaseModalButtons';
import BaseModalConfirmButton from '../../Common/Modals/BaseModalConfirmButton';
import BaseModalConfirmText from '../../Common/Modals/BaseModalConfirmText';

// ---------------------------------------------------------------------------------------
// Redux

@connect((store) => {
    return {
        editModalActive: store.lists.editModalActive,
        editList: store.lists.editList
    }
})

class EditListModal extends Component {
    constructor() {
        super();
        this.state = {
            listName: ''
        }
    }

    setListNameValue() {
        this.setState({listName: this.props.editList.list_name})
    }

    updateListName() {
        let list = this.props.editList;
        list.list_name = this.state.listName;
        this.props.dispatch(editList(list));
    }

    cancelModal() {
        this.props.dispatch(closeEditModal());
    }

    render() {
        return (
            <Modal
                isVisible={this.props.editModalActive}
                avoidKeyboard={true}
                onModalShow={() => {
                    this.setListNameValue();
                    this.addInput.focus();
                }}
            >
                <BaseModalWrapper>
                    <BaseModalInputWrapper>
                        <BaseModalInput
                            placeholder="List"
                            placeholderTextColor="rgba(0, 0, 0, 0.9)"
                            underlineColorAndroid="transparent"
                            ref={(input) => { this.addInput = input; }}
                            value={this.state.listName}
                            onChangeText={(text) => this.setState({listName: text})}
                            onSubmitEditing={() => this.updateListName()}
                        />
                    </BaseModalInputWrapper>

                    <BaseModalButtons>
                        <BaseModalConfirmButton
                            activeOpacity={0.8}
                            onPress={() => this.cancelModal()}
                        >
                            <BaseModalConfirmText>
                                Cancel
                            </BaseModalConfirmText>
                        </BaseModalConfirmButton>

                        <BaseModalConfirmButton
                            activeOpacity={0.8}
                            onPress={() => this.updateListName()}
                        >
                            <BaseModalConfirmText>
                                Save
                            </BaseModalConfirmText>
                        </BaseModalConfirmButton>
                    </BaseModalButtons>

                </BaseModalWrapper>
            </Modal>
        )
    }
}

export default EditListModal;