/* eslint-disable */

import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
	Box,
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	List,
	ListIcon,
	ListItem,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { NotAllowedIcon } from "@chakra-ui/icons";
import api from "api/api";

const LoadingModal = ({ isLoading = false, errors, setShow }) => {
	return (<Modal
		isOpen={true}
		isCentered
		trapFocus={true}
		onClose={() => setShow(false)}
	>
		<ModalOverlay />
		<ModalContent>
			<ModalHeader>Uploading</ModalHeader>
			{/* <ModalCloseButton /> */}
			<ModalBody>
				{!isLoading && <ModalCloseButton />}
				{isLoading
					? <>
						<Spinner />
						<Text>Registering...</Text>
					</>
					: <List spacing={3}>
						{errors?.map((item, index) => {
							return (<>
								<ListItem key={index} color="red.300" display="flex" alignItems="center" >
									<ListIcon color="red.300" as={NotAllowedIcon} />
									{item}
								</ListItem>
							</>
							)
						}
						)}
					</List>}
			</ModalBody>
		</ModalContent>
	</Modal>
	)
}

function Register() {
	// Chakra color mode
	const textColor = useColorModeValue("navy.700", "white");
	const textColorSecondary = "gray.400";
	const brandStars = useColorModeValue("brand.500", "brand.400");
	const [show, setShow] = useState(false);
	const [keepLoggedIn, setKeepLoggedIn] = useState(true)
	const [username, setUsername] = useState("")
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [email, setEmail] = useState("")
	const router = useHistory()

	const [isLoading, setIsLoading] = useState(false)
	const [showModal, setShowModal] = useState(false)
	const [error, setError] = useState([])

	const handleChange = (event) => {
		const { name, value } = event.target;
		switch (name) {
			case "username":
				setUsername(value);
				break;
			case "firstName":
				setFirstName(value);
				break;
			case "lastName":
				setLastName(value);
				break;
			case "password":
				setPassword(value);
				break;
			case "confirmPassword":
				setConfirmPassword(value);
				break;
			case "email":
				setEmail(value);
				break;
			default:
				break;
		}
	}

	const checkValues = () => {
		let errors = []
		if (username === "") {
			errors.push("Username cannot be empty")
		}
		if (password === "") {
			errors.push("Password cannot be empty")
		}
		if (confirmPassword === "") {
			errors.push("Confirm password cannot be empty")
		}
		if (email === "") {
			errors.push("Email cannot be empty")
		}
		if (password !== confirmPassword) {
			errors.push("Passwords do not match")
		}
		if (password.length < 8) {
			errors.push("Password must be at least 8 characters")
		}
		if (password.search(/[a-z]/i) < 0) {
			errors.push("Password must contain at least one letter")
		}
		setError(errors)
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		setIsLoading(true)
		setShowModal(true)
		checkValues()
		if (error.length == 0) {
			api.post("/api/auth/user/", {
				username: username,
				first_name: firstName,
				last_name: lastName,
				password: password,
				email: email
			}).then((response) => {
				if (response.ok) {
					setIsLoading(false)
					setShowModal(false)
					let tokens = response.data;
					if (keepLoggedIn){
						localStorage.setItem("access_token", tokens.access);
						localStorage.setItem("refresh_token", tokens.refresh);
					}
					else{
						sessionStorage.setItem("access_token", tokens.access);
						sessionStorage.setItem("refresh_token", tokens.refresh);
					}
					router.push("/admin/profile")
				}
				else {
					setError([response.data?.error])
				}
			}
			).catch((error) => {
				setError(error)
			}
			)
		}
	}


	const handleClick = () => setShow(!show);
	return (
		<DefaultAuth illustrationBackground={illustration} image={illustration}>
			{showModal && <LoadingModal isLoading={false} errors={error} setShow={setShowModal} />}
			<Flex
				maxW={{ base: "100%", md: "max-content" }}
				w='100%'
				mx={{ base: "auto", lg: "0px" }}
				me='auto'
				h='100%'
				alignItems='start'
				justifyContent='center'
				mb={{ base: "30px", md: "60px" }}
				px={{ base: "25px", md: "0px" }}
				mt={{ base: "40px", md: "14vh" }}
				flexDirection='column'>
				<Box me='auto'>
					<Heading color={textColor} fontSize='36px' mb='10px'>
						Register
					</Heading>
				</Box>
				<Flex
					zIndex='2'
					direction='column'
					w={{ base: "100%", md: "420px" }}
					maxW='100%'
					background='transparent'
					borderRadius='15px'
					mx={{ base: "auto", lg: "unset" }}
					me='auto'
					mb={{ base: "20px", md: "auto" }}>
					{/* <Button
            fontSize='sm'
            me='0px'
            mb='26px'
            py='15px'
            h='50px'
            borderRadius='16px'
            bg={googleBg}
            color={googleText}
            fontWeight='500'
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}>
            <Icon as={FcGoogle} w='20px' h='20px' me='10px' />
            Sign in with Google
          </Button> */}
					{/* <Flex align='center' mb='25px'>
                        <HSeparator />
                        <Text color='gray.400' mx='14px'>
                            or
                        </Text>
                        <HSeparator />
                    </Flex> */}
					<FormControl>
						<FormLabel
							display='flex'
							ms='4px'
							fontSize='sm'
							fontWeight='500'
							color={textColor}
							mb='8px'>
							Username<Text color={brandStars}>*</Text>
						</FormLabel>
						<Input
							name="username"
							onChange={handleChange}
							isRequired={true}
							variant='auth'
							fontSize='sm'
							ms={{ base: "0px", md: "0px" }}
							type='text'
							placeholder='johndoe2221'
							mb='24px'
							fontWeight='500'
							size='lg'
						/>
						<FormLabel
							display='flex'
							ms='4px'
							fontSize='sm'
							fontWeight='500'
							color={textColor}
							mb='8px'>
							Email<Text color={brandStars}>*</Text>
						</FormLabel>
						<Input
							name="email"
							onChange={handleChange}
							isRequired={true}
							variant='auth'
							fontSize='sm'
							ms={{ base: "0px", md: "0px" }}
							type='email'
							placeholder='abc@xyz.com'
							mb='24px'
							fontWeight='500'
							size='lg'
						/>
						<Grid
							gridTemplateColumns="49% 49%"
							columnGap="2%"
						>
							<Box>
								<FormLabel
									display='flex'
									ms='4px'
									fontSize='sm'
									fontWeight='500'
									color={textColor}
									mb='8px'>
									FirstName<Text color={brandStars}></Text>
								</FormLabel>
								<Input
									name="firstName"
									onChange={handleChange}
									// isRequired={true}
									variant='auth'
									fontSize='sm'
									ms={{ base: "0px", md: "0px" }}
									type='text'
									placeholder='John'
									mb='24px'
									fontWeight='500'
									size='lg'
								/>
							</Box>
							<Box>
								<FormLabel
									display='flex'
									ms='4px'
									fontSize='sm'
									fontWeight='500'
									color={textColor}
									mb='8px'>
									Last Name<Text color={brandStars}></Text>
								</FormLabel>
								<Input
									name="lastName"
									onChange={handleChange}
									// isRequired={true}
									variant='auth'
									fontSize='sm'
									ms={{ base: "0px", md: "0px" }}
									type='text'
									placeholder='Doe'
									mb='24px'
									fontWeight='500'
									size='lg'
								/>
							</Box>
						</Grid>
						<FormLabel
							ms='4px'
							fontSize='sm'
							fontWeight='500'
							color={textColor}
							display='flex'>
							Password<Text color={brandStars}>*</Text>
						</FormLabel>
						<InputGroup size='md'>
							<Input
								name="password"
								onChange={handleChange}
								isRequired={true}
								fontSize='sm'
								placeholder='Min. 8 characters'
								mb='24px'
								size='lg'
								type={show ? "text" : "password"}
								variant='auth'
							/>
							<InputRightElement display='flex' alignItems='center' mt='4px'>
								<Icon
									color={textColorSecondary}
									_hover={{ cursor: "pointer" }}
									as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
									onClick={handleClick}
								/>
							</InputRightElement>
						</InputGroup>
						<FormLabel
							ms='4px'
							fontSize='sm'
							fontWeight='500'
							color={textColor}
							display='flex'>
							Confirm Password<Text color={brandStars}>*</Text>
						</FormLabel>
						<InputGroup size='md'>
							<Input
								name="confirmPassword"
								onChange={handleChange}
								isRequired={true}
								fontSize='sm'
								placeholder='Min. 8 characters'
								mb='24px'
								size='lg'
								type={show ? "text" : "password"}
								variant='auth'
							/>
							<InputRightElement display='flex' alignItems='center' mt='4px'>
								<Icon
									color={textColorSecondary}
									_hover={{ cursor: "pointer" }}
									as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
									onClick={handleClick}
								/>
							</InputRightElement>
						</InputGroup>
						<Flex justifyContent='space-between' align='center' mb='24px'>
							<FormControl display='flex' alignItems='center'>
								<Checkbox
									id='remember-login'
									colorScheme='brandScheme'
									me='10px'
									defaultChecked
									onChange={() => setKeepLoggedIn(!keepLoggedIn)}
								/>
								<FormLabel
									htmlFor='remember-login'
									mb='0'
									fontWeight='normal'
									color={textColor}
									fontSize='sm'>
									Keep me logged in
								</FormLabel>
							</FormControl>
							{/* <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Forgot password?
                </Text>
              </NavLink> */}
						</Flex>
						<Button
							onClick={handleSubmit}
							fontSize='sm'
							variant='brand'
							fontWeight='500'
							w='100%'
							h='50'
							mb='24px'>
							Register
						</Button>
					</FormControl>
				</Flex>
			</Flex>
		</DefaultAuth>
	);
}

export default Register;
