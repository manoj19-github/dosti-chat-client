import React,{useRef,useState} from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,Button,
  useToast,Input
} from '@chakra-ui/react'
import {Box} from "@chakra-ui/layout"
import {useDispatch,useSelector} from "react-redux"
import {FormControl} from "@chakra-ui/form-control"
import {useDisclosure} from "@chakra-ui/hooks"
import UserListItem from "../userAvatar/UserListItem"
import UserBadgeItem from "../userAvatar/UserBadgeItem"
import {searchGroupMembersAction} from "../../redux/action/users/searchGroupMembersAction"
import{createGroupAction} from "../../redux/action/users/createGroupAction"
import {debounce} from "../../config/chatLogics"
import { MembersRequestTypes} from "../../redux/action/Types"

//    modal for create group

const GroupChatModal = ({children}) => {
  const searchGUserLoading=useSelector(state=>state.searchGroupUsersReducer.loading)
  const searchGUserData=useSelector(state=>state.searchGroupUsersReducer.usersData)
  const newChatAdded=useSelector(state=>state.chatReducer.newChatAdded)
  const dispatch=useDispatch()
  const [groupChatName,setGroupChatName]=useState("")
  const [selectedUsers,setSelectedUsers]=useState([])
  const [search,setSearch]=useState(null)
  const [searchResult,setSearchResult]=useState(null)
  const [loading,setLoading]=useState(false)
  const toast=useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const finalRef =useRef()


  const handleSearch=(value)=>{
    setSearch(value)
    if(!search) return
      //  debouncing function for  network call
    debounce(dispatch(searchGroupMembersAction(search)),8000)
  }
  const setToGroup=(user)=>{
    if(selectedUsers.includes(user)){
      toast({
        title:`User Already added`,
        status:"warning",
        duration:5000,
        position:"top"
      })
      return
    }
    setSelectedUsers([...selectedUsers,user])

  }
  const handleDelete=(delUser)=>{
    setSelectedUsers(selectedUsers.filter((user)=>delUser._id!==user._id))
  }

  const handleSubmit=()=>{
    if(!groupChatName || !selectedUsers){
      toast({
        title:"Please fill all the fields",
        status:"warning",
        duration:5000,
        isClosable:true,
        position:"top"
      })
      return
    }
    dispatch(createGroupAction(groupChatName,selectedUsers))
    onClose()
    setGroupChatName([])
    setSelectedUsers([])
    dispatch({type:MembersRequestTypes.SEARCH_INIT})
  }

  const handleOpen=()=>{
    dispatch({type:MembersRequestTypes.SEARCH_INIT})
    onOpen()
    setGroupChatName([])
    setSelectedUsers([])
    setSearch("")
  }
  const handleClose=()=>{
    dispatch({type:MembersRequestTypes.SEARCH_INIT})
    setSearch("")
    onClose()
    setGroupChatName([])
    setSelectedUsers([])
  }
    return (
    <>
    <span onClick={handleOpen}>{children}</span>

  <Modal isOpen={isOpen} onClose={handleClose} finalFocusRef={finalRef}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader
        fontFamily="Work sans"
        fontSize="35px"
        d="flex"
        justifyContent="center"
      >Create Group Chat</ModalHeader>
      <ModalCloseButton />
      <ModalBody
        d="flex"
        flexDirection="column"
        alignItems="center"
      >
      <FormControl>
        <Input
          type="text"
          placeholder="Group Name"
          mb={2}
          value={groupChatName}
          color="gray"
          onChange={(e)=>setGroupChatName(e.target.value)}

        />
      </FormControl>
      <FormControl>
        <Input
          type="text"
          placeholder="Add Users eg: Soham, Manoj, Swarnali"
          mb={2}
          value={search}
          color="gray"
          onChange={(e)=>handleSearch(e.target.value)}
        />
      </FormControl>
      {/* selected searched users */}
      <Box
        w="100%"
        flexWrap="wrap"
        d="flex"
      >

      {
        selectedUsers?.map((user,index)=>(
        <UserBadgeItem key={index}
          user={user}
          handleClick={()=>handleDelete(user)}

        />
      ))
    }
      </Box>
            {/* render searched users */}
      {searchGUserLoading?(<div>Loading ... </div>):(
        searchGUserData?.slice(0,4).map((user,index)=>(
          <UserListItem
            key={index}
            user={user}
            handleClick={()=>setToGroup(user)}
          />

        ))
      )}

      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Create
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
    </>
  )
}


export default GroupChatModal
