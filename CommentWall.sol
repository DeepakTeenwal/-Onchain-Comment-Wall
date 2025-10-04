// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title CommentWall
 * @notice A simple onchain comment wall where users can post messages permanently
 * @dev Messages are stored directly onchain with minimal gas optimization
 */
contract CommentWall {
    struct Comment {
        address user;
        string message;
        string fid; // Farcaster ID
        uint256 timestamp;
        uint256 likes;
    }

    Comment[] public comments;
    mapping(uint256 => mapping(address => bool)) public hasLiked;
    
    uint256 public constant MAX_MESSAGE_LENGTH = 280;
    uint256 public messageCount;

    event NewComment(
        uint256 indexed id,
        address indexed user,
        string message,
        string fid,
        uint256 timestamp
    );
    
    event CommentLiked(
        uint256 indexed id,
        address indexed liker,
        uint256 totalLikes
    );

    /**
     * @notice Post a new comment to the wall
     * @param _message The message content (max 280 chars)
     * @param _fid The user's Farcaster ID
     */
    function postComment(string calldata _message, string calldata _fid) external {
        require(bytes(_message).length > 0, "Message cannot be empty");
        require(bytes(_message).length <= MAX_MESSAGE_LENGTH, "Message too long");
        
        comments.push(Comment({
            user: msg.sender,
            message: _message,
            fid: _fid,
            timestamp: block.timestamp,
            likes: 0
        }));
        
        emit NewComment(messageCount, msg.sender, _message, _fid, block.timestamp);
        messageCount++;
    }

    /**
     * @notice Like a comment (one like per address per comment)
     * @param _id The comment ID to like
     */
    function likeComment(uint256 _id) external {
        require(_id < comments.length, "Comment does not exist");
        require(!hasLiked[_id][msg.sender], "Already liked this comment");
        
        comments[_id].likes++;
        hasLiked[_id][msg.sender] = true;
        
        emit CommentLiked(_id, msg.sender, comments[_id].likes);
    }

    /**
     * @notice Get recent comments (newest first)
     * @param _count Number of comments to retrieve
     * @return Array of recent comments
     */
    function getRecentComments(uint256 _count) external view returns (Comment[] memory) {
        uint256 total = comments.length;
        if (total == 0) {
            return new Comment[](0);
        }
        
        uint256 count = _count > total ? total : _count;
        Comment[] memory recent = new Comment[](count);
        
        for (uint256 i = 0; i < count; i++) {
            recent[i] = comments[total - 1 - i];
        }
        
        return recent;
    }

    /**
     * @notice Get total number of comments
     * @return Total comment count
     */
    function getTotalComments() external view returns (uint256) {
        return comments.length;
    }

    /**
     * @notice Get a specific comment by ID
     * @param _id Comment ID
     * @return Comment struct
     */
    function getComment(uint256 _id) external view returns (Comment memory) {
        require(_id < comments.length, "Comment does not exist");
        return comments[_id];
    }

    /**
     * @notice Check if an address has liked a specific comment
     * @param _id Comment ID
     * @param _user Address to check
     * @return Boolean indicating if user has liked the comment
     */
    function hasUserLiked(uint256 _id, address _user) external view returns (bool) {
        return hasLiked[_id][_user];
    }
}
