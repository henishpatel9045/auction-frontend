// Chakra Imports
import {
	Avatar,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue
} from '@chakra-ui/react';
// Custom Components
import { SidebarResponsive } from 'components/sidebar/Sidebar';
import PropTypes from 'prop-types';
import React from 'react';
// Assets
import routes from 'routes.js';
import { ColorModeToggle } from '@hypertheme-editor/chakra-ui';
import { useEffect } from 'react';
import api from 'api/api';
import { useState } from 'react';
export default function HeaderLinks(props) {
	const { secondary } = props;
	// Chakra Color Mode
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);
	
	const [data, setData] = useState({})

	useEffect(() => {
		let token =
		  localStorage.getItem("access_token") ||
		  sessionStorage.getItem("access_token");
		api.setHeaders({
		  Authorization: `JWT ${token}`,
		});
		api
		  .get("api/auth/user")
		  .then(res => {
			if (res.ok){
			  setData(res.data)
			}else{
			  console.log(res.data)
			}
		  })
	  }, [])

	return (
		<Flex
			w={{ sm: '100%', md: 'auto' }}
			alignItems="center"
			flexDirection="row"
			bg={menuBg}
			flexWrap={secondary ? { base: 'wrap', md: 'nowrap' } : 'unset'}
			p="10px"
			borderRadius="30px"
			boxShadow={shadow}>
			{/* <SearchBar mb={secondary ? { base: '10px', md: 'unset' } : 'unset'} me="10px" borderRadius="30px" /> */}
			<Flex
				bg={ethBg}
				display={secondary ? 'flex' : 'none'}
				borderRadius="30px"
				ms="auto"
				p="6px"
				align="center"
				me="6px">
			</Flex>
			<SidebarResponsive routes={routes} />
			{/* <ThemeEditor navbarIcon={navbarIcon} /> */}
			<ColorModeToggle/>
			<Menu>
				<MenuButton ml="1rem" p="0px">
					<Avatar
						_hover={{ cursor: 'pointer' }}
						color="white"
						name={data?.name || data?.username}
						bg="#11047A"
						size="sm"
						w="40px"
						h="40px"
					/>
				</MenuButton>
				<MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
					<Flex w="100%" mb="0px">
						<Text
							ps="20px"
							pt="16px"
							pb="10px"
							w="100%"
							borderBottom="1px solid"
							borderColor={borderColor}
							fontSize="sm"
							fontWeight="700"
							color={textColor}>
							👋&nbsp; Hey, {data?.name || data?.username}
						</Text>
					</Flex>
					<Flex flexDirection="column" p="10px">
						<MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
							<Text fontSize="sm">Profile Settings</Text>
						</MenuItem>
						{/* <MenuItem _hover={{ bg: 'none' }} _focus={{ bg: 'none' }} borderRadius="8px" px="14px">
							<Text fontSize="sm">Newsletter Settings</Text>
						</MenuItem> */}
						<MenuItem
							_hover={{ bg: 'none' }}
							_focus={{ bg: 'none' }}
							color="red.400"
							borderRadius="8px"
							px="14px"
							onClick={() => {
								localStorage.removeItem('access_token');
								sessionStorage.removeItem('access_token');
								window.location.reload();
							}}>
							<Text fontSize="sm">Log out</Text>
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</Flex>
	);
}

HeaderLinks.propTypes = {
	variant: PropTypes.string,
	fixed: PropTypes.bool,
	secondary: PropTypes.bool,
	onOpen: PropTypes.func
};
