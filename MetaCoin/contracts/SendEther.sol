pragma solidity >=0.4.25 <0.7.0;

contract SendEther {
    string public functionCalled;

    function sendEther() external payable {
        functionCalled = 'sendEther';
    }

    function() external payable {
        functionCalled = 'fallback';
    }
}