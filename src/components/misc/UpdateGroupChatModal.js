import React,{useState} from 'react'
import swal from "sweetalert"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,Box,
  ModalCloseButton,Button,useToast,
  FormControl,FormLabel,
  Input,Text
} from '@chakra-ui/react'
import {MembersRequestTypes} from "../../redux/action/Types"
import UserBadgeItem from "../userAvatar/UserBadgeItem"
import{IconButton} from "@chakra-ui/button"
import {useDisclosure} from "@chakra-ui/hooks"
import {ViewIcon} from "@chakra-ui/icons"
import {useDispatch,useSelector} from "react-redux"
import {debounce} from "../../config/chatLogics"
import {searchGroupMembersAction} from "../../redux/action/users/searchGroupMembersAction"
import UserListItem from "../userAvatar/UserListItem"
import {GroupRenameAction} from "../../redux/action/users/chatGroupRenameAction"
import {removeToGroupAction}from "../../redux/action/users/removeToGroupAction"
import {addToGroupAction} from "../../redux/action/users/addToGroupAction"
const UpdateGroupChatModal = () => {
  const toast=useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch=useDispatch()

  const searchGUserLoading=useSelector(state=>state.searchGroupUsersReducer.loading)
  const searchGUserData=useSelector(state=>state.searchGroupUsersReducer.usersData)
  const selectedChat=useSelector(state=>state.selectUserReducer.selectChatResult)
  const groupAdmin=useSelector(state=>state.selectUserReducer.selectChatResult.groupAdmin)
  const loggedUser=useSelector(state=>state.authReducer.userAccountData.sendUser)
  const [groupChatName,setGroupChatName]=useState(selectedChat.chatName)

  const [search,setSearch]=useState([])
  const [searchResult,setSearchResult]=useState([])
  const [searchText,setSearchText]=useState("")

  const handleGroupChatName=(val)=>{
    let filterVal=val.trim()
    setGroupChatName(filterVal)
  }

  const removeMySelf=()=>{
      swal({
        title: "Warning!",
        text: "Are You Sure To left from the Group",
        icon: "warning",
        button: "yes",
    }).then(()=>{
      dispatch(removeToGroupAction(loggedUser._id,selectedChat._id))

    })
  }


  const handleRemoveToGroup=(userId)=>{
    if(loggedUser._id!==groupAdmin) return
    swal({
      title: "Warning!",
      text: "Are You Sure  dismiss the Group",
      icon: "warning",
      button: "yes",
    }).then(()=>{
      dispatch(removeToGroupAction(userId,selectedChat._id))

    })

  }
  const handleRename=()=>{
    if(groupChatName === selectedChat.chatName) return
    dispatch(GroupRenameAction(groupChatName,selectedChat._id))
    onClose()
  }
  const handleSearch=(value)=>{
    setSearchText(value)
    if(!searchText) return
    debounce(dispatch(searchGroupMembersAction(searchText)),8000)

  }
  const handleAddToGroup=(userId)=>{
    if(selectedChat.users.find((user)=>user._id===userId)){
      swal({
        title: "Sorry !!",
        text: "User Already Success !!",
        icon: "error",
        button: "Ok!",
      });
    }else{
      dispatch(addToGroupAction(userId,selectedChat._id))
      swal({
        title: "New User Added",
        text: "User Added to  Group !!",
        icon: "success",
        button: "Ok!",
      });

    }

  }
  const handleClose=()=>{
    setSearchText("")
    dispatch({type:MembersRequestTypes.SEARCH_INIT})
    onClose()
  }
  const handleOpen=()=>{
    setSearchText("")
    dispatch({type:MembersRequestTypes.SEARCH_INIT})
    onOpen()
  }



    return (
        <div>
        <IconButton
         onClick={handleOpen}
         d={{base:"flex"}}
         icon={<ViewIcon/>}
         />

       <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="25px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Member List : -</Text>
            <Box w="100%" d="flex" flexWrap="wrap">
            {selectedChat.users.map((user,index)=>(
              <UserBadgeItem
                key={index}
                user={user}
                handleClick={()=>handleRemoveToGroup(user._id)}
                isAdmin={groupAdmin}

              />

            ))}
            </Box>
            <FormControl d="flex" flexDirection="column">

            <Input
              placeholder="Group Name"

              value={groupChatName}
              onChange={(e)=>handleGroupChatName(e.target.value)}
            />
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add User To group"

                value={searchText}
                onChange={(event)=>handleSearch(event.target.value)}

              />
            </FormControl>
            {/* render searched users */}
      {searchGUserLoading?(<div>Loading ... </div>):(
        searchGUserData?.slice(0,3).map((suser,index)=>(
          <UserListItem
            key={index}
            user={suser}
            handleClick={()=>handleAddToGroup(suser._id)}
          />

        ))
      )}

          </ModalBody>

          <ModalFooter
              d="flex"
              flexDirection={{base:"column",md:"row"}}
              justifyContent="space-between"


            >
          <Button
            varaint="solid"
            colorScheme="red"
            ml={1}
            onClick={removeMySelf}
          >{loggedUser._id ===groupAdmin?`Remove Group`:`Leave Group` }
          </Button>
          <Button
            varaint="solid"
            colorScheme="teal"
            ml={1}
            mt={{base:"5px",md:"1px"}}

            onClick={handleRename}
          >Update Group Name
          </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


        </div>
    )
}

export default UpdateGroupChatModal
