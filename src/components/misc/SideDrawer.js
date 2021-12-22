import React,{useState,useRef} from 'react'
import {useHistory} from "react-router-dom"
import {useDisclosure} from "@chakra-ui/hooks"
import {useDispatch,useSelector} from "react-redux"
import {
  Tooltip,Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Drawer,DrawerCloseButton,
  DrawerOverlay,
  DrawerHeader,DrawerContent,
  DrawerBody,Input,DrawerFooter,useToast

} from "@chakra-ui/react"
import {Button} from "@chakra-ui/button"
import {Box,Text} from "@chakra-ui/layout"
import {BellIcon,ChevronDownIcon} from "@chakra-ui/icons"
import {Avatar} from "@chakra-ui/avatar"
import {Effect} from "react-notification-badge"
import NotificationBadge from "react-notification-badge"
import ProfileModel from "../misc/ProfileModel"
import ChatLoading from "../misc/ChatLoading"
import UserListItem from "../userAvatar/UserListItem"
import {searchUsersAction} from "../../redux/action/users/searchUsersAction"
import {selectUsersAction} from "../../redux/action/users/selectUsersAction"
import {logoutAction} from "../../redux/action/authAction/loginAction"
import {
  searchTypes,
  selectChatTypes,
  notificationTypes
} from "../../redux/action/Types"
import {Spinner} from "@chakra-ui/spinner"
import {getSender} from "../../config/chatLogics"
const SideDrawer = () => {
  const dispatch=useDispatch()
  const loggedUser=useSelector(state=>state.authReducer.userAccountData)
  const searchLoading=useSelector(state=>state.searchUserReducer.loading)
  const searchUserResult=useSelector(state=>state.searchUserReducer.userResult?.users)
  const userDetails=useSelector(state=>state.authReducer.userAccountData.sendUser)
  const selectChatLoading=useSelector(state=>state.selectUserReducer.loading)
  const selectChatResult=useSelector(state=>state.selectUserReducer.selectChatResult)
  const selectChatError=useSelector(state=>state.selectUserReducer.error)
  const notifyData=useSelector(state=>state.notifyReducer.notifyData)

  const history=useHistory()
  const btnRef=useRef()
  const [search,setSearch]=useState("")

  const logoutHandler=()=>{
    sessionStorage.removeItem("dosti-account-info")
    logoutAction()
    history.push("/")
  }
  const {isOpen,onOpen,onClose}=useDisclosure()
  const toast=useToast()
  const handleSearch=async()=>{
    if(!search){
      toast({
        title:"Please Enter something in search",
        status:"warning",
        duration:3000,
        isClosable:true,
        position:"top-left"
      })
      return
    }
    dispatch(searchUsersAction(search))
    console.log("searchResult",searchUserResult)
    setSearch('')
  }

   const accessChat=(userId)=>{

     dispatch(selectUsersAction(userId))
     onClose()
     if(selectChatResult==null && selectChatError){
       toast({
         title:"Error in fetching the chat",
         description:"something went wrong",
         status:"error",
         duration:4000,
         isClosable:true,
         position:"bottom-left",
       })
     }

  }


  const drawerClose=()=>{
    dispatch({type:searchTypes.SEARCH_COMPLETE})
    onClose()

  }
  const handleNotifyClick=(note)=>{
    // select the chat

    dispatch({
      type:selectChatTypes.ACCESS_SUCCESS,
      payload:note.chat
    })
    // reset the notification
    if(notifyData.length==1){
      localStorage.removeItem("dosti-chat-notifyData")
    }
    dispatch({
      type:notificationTypes.NOTIFY_RESET,
      payload:note
    })
    if(notifyData.length>1)
      localStorage.setItem("dosti-chat-notifyData",JSON.stringify(notifyData))


  }


    return (
      <>
        <Box
          bg="white"
          d="flex"
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          p={{base:"2px 10px 2px 10px",md:"2px 4px 2px 4px",sm:0}}
          borderWidth="2px"
        >
          <Tooltip
            label="Search Users to Chat"
            hasArrow
            placement="bottom-end"
          >
          <Button variant="ghost" onClick={onOpen} ref={btnRef}>
            <i class="fa fa-search" aria-hidden="true"/>
            <Text
              d={{base:"none",md:"flex"}}
              px={{base:"4px",md:"1px"}}
            >
            Search User</Text>
          </Button>
          </Tooltip>
          <Text
            fontSize="2xl"
            fontFamily="work sans"

          >
          DosTi
          </Text>
          <Box>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notifyData.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize={{lg:"2xl",md:"1xl",sm:"lg"}} m={{base:1,md:0}}/>
            </MenuButton>
            <MenuList p={2} bg="gray" color="black">
              {!notifyData.length && "No new Messages"}
              {

                notifyData?.map((note,index)=>(
                  <MenuItem key={note._id} onClick={()=>handleNotifyClick(note)}>
                    {note.chat.isGroupChat?`New Message in ${note.chat.chatName}`
                    : `new Message from ${getSender(loggedUser,note.chat.users)}`
                  }
                  </MenuItem>
                ))
              }

            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
            <Avatar size="sm"cursor="pointer"
              name={`${userDetails.name}`}
              src={`${userDetails.pic}`}

            />

            </MenuButton>
            <MenuList>
              <ProfileModel user={userDetails} >
                <MenuItem>My Profile</MenuItem>
              </ProfileModel>
              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
          </Box>
        </Box>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={drawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Create your account
          </DrawerHeader>
          <DrawerBody>
            <Box
              d="flex"
              pb={2}
            >
            <Input
              placeholder="Search By Name Or Email"
              mr={2}
              value={search}
              onChange={e=>setSearch(e.target.value)}
            />
            <Button
              onClick={handleSearch}
            >Go
            </Button>
        </Box>
            {
            searchLoading?(
              <ChatLoading/>
            ):(

              searchUserResult?.map((user,index)=>(
                  <UserListItem
                    key={index}
                    user={user}
                    handleClick={()=>accessChat(user._id)}
                    />
                ))
            )
          }
          {selectChatLoading && <Spinner ml="auto" d="flex"/> }

          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </>

    )
}

export default SideDrawer
