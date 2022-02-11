// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.0;

contract Pixel {
    event ValidPixel(string pixel_data);
    function accept_pixel(string memory pixel) public payable {
        require(msg.value >= 0.0004 ether);
        emit ValidPixel(pixel);
    }
}