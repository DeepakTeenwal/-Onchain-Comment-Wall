const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CommentWall", function () {
  let commentWall;
  let owner;
  let user1;
  let user2;

  beforeEach(async function () {
    [owner, user1, user2] = await ethers.getSigners();
    
    const CommentWall = await ethers.getContractFactory("CommentWall");
    commentWall = await CommentWall.deploy();
    await commentWall.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should deploy successfully", async function () {
      expect(await commentWall.getAddress()).to.be.properAddress;
    });

    it("Should start with zero comments", async function () {
      expect(await commentWall.getTotalComments()).to.equal(0);
    });

    it("Should have correct max message length", async function () {
      expect(await commentWall.MAX_MESSAGE_LENGTH()).to.equal(280);
    });
  });

  describe("Posting Comments", function () {
    it("Should post a comment successfully", async function () {
      const message = "Hello blockchain!";
      const fid = "12345";

      await expect(commentWall.postComment(message, fid))
        .to.emit(commentWall, "NewComment")
        .withArgs(0, owner.address, message, fid, await time.latest());

      expect(await commentWall.getTotalComments()).to.equal(1);
    });

    it("Should reject empty messages", async function () {
      await expect(
        commentWall.postComment("", "12345")
      ).to.be.revertedWith("Message cannot be empty");
    });

    it("Should reject messages that are too long", async function () {
      const longMessage = "a".repeat(281);
      
      await expect(
        commentWall.postComment(longMessage, "12345")
      ).to.be.revertedWith("Message too long");
    });

    it("Should allow multiple users to post", async function () {
      await commentWall.connect(user1).postComment("User 1 message", "111");
      await commentWall.connect(user2).postComment("User 2 message", "222");

      expect(await commentWall.getTotalComments()).to.equal(2);
    });

    it("Should store comment data correctly", async function () {
      const message = "Test message";
      const fid = "12345";

      await commentWall.connect(user1).postComment(message, fid);

      const comment = await commentWall.getComment(0);
      expect(comment.user).to.equal(user1.address);
      expect(comment.message).to.equal(message);
      expect(comment.fid).to.equal(fid);
      expect(comment.likes).to.equal(0);
    });
  });

  describe("Liking Comments", function () {
    beforeEach(async function () {
      await commentWall.postComment("Test message", "12345");
    });

    it("Should like a comment successfully", async function () {
      await expect(commentWall.connect(user1).likeComment(0))
        .to.emit(commentWall, "CommentLiked")
        .withArgs(0, user1.address, 1);

      const comment = await commentWall.getComment(0);
      expect(comment.likes).to.equal(1);
    });

    it("Should not allow liking the same comment twice", async function () {
      await commentWall.connect(user1).likeComment(0);
      
      await expect(
        commentWall.connect(user1).likeComment(0)
      ).to.be.revertedWith("Already liked this comment");
    });

    it("Should allow different users to like the same comment", async function () {
      await commentWall.connect(user1).likeComment(0);
      await commentWall.connect(user2).likeComment(0);

      const comment = await commentWall.getComment(0);
      expect(comment.likes).to.equal(2);
    });

    it("Should reject liking non-existent comment", async function () {
      await expect(
        commentWall.likeComment(999)
      ).to.be.revertedWith("Comment does not exist");
    });

    it("Should track who liked which comment", async function () {
      await commentWall.connect(user1).likeComment(0);

      expect(await commentWall.hasUserLiked(0, user1.address)).to.be.true;
      expect(await commentWall.hasUserLiked(0, user2.address)).to.be.false;
    });
  });

  describe("Getting Comments", function () {
    beforeEach(async function () {
      await commentWall.postComment("First", "1");
      await commentWall.postComment("Second", "2");
      await commentWall.postComment("Third", "3");
    });

    it("Should get recent comments in reverse order", async function () {
      const comments = await commentWall.getRecentComments(3);
      
      expect(comments.length).to.equal(3);
      expect(comments[0].message).to.equal("Third");
      expect(comments[1].message).to.equal("Second");
      expect(comments[2].message).to.equal("First");
    });

    it("Should handle requesting more comments than exist", async function () {
      const comments = await commentWall.getRecentComments(10);
      expect(comments.length).to.equal(3);
    });

    it("Should return empty array when no comments exist", async function () {
      const emptyWall = await (await ethers.getContractFactory("CommentWall")).deploy();
      const comments = await emptyWall.getRecentComments(10);
      
      expect(comments.length).to.equal(0);
    });

    it("Should get specific comment by ID", async function () {
      const comment = await commentWall.getComment(1);
      expect(comment.message).to.equal("Second");
    });

    it("Should get total comments count", async function () {
      expect(await commentWall.getTotalComments()).to.equal(3);
    });
  });
});
