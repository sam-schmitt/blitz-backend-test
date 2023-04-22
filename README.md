# Blitz Backend Coding Exercies

[Demo Video](https://youtu.be/3MdJsQkVb-U)

## The Problem

In TQL, there is no option for `UPDATE`. So instead, the method to update attributes to a relation is:

1. First, query for all relations that you would like to update
2. Then delete the attributes you are updating.
3. Finally, you can then insert data to replace those attributes, and this is all accomplished in one stream.

This is already pretty inefficient, and it leads to a very bad error, which is what I’ve been tasked to attempt to solve.

When you are going through relations that you would like to replace one attribute in bulk, if one single relation is missing that attribute, then you will be unable to perform this bulk update. The reason why is that in the deletion step, you are unable to delete an attribute that does not exist.

This makes it impossible to effectively make updates to large sets of relations and is going to make using TypeDB unsustainable for complex use cases that require this feature frequently.

## My Solution

Initially, I attempted to figure out how to do this in one stream mutation. However, it seems to be very difficult to accomplish this, especially without an UPDATE feature in TQL.

So, instead, I decided to dedicate my time to finding a method that works in two streams. The solution that I came up with goes like this:

**Stream 1**

1. First, find all relations you are going to update.
2. Then add the new value to all of the relations.

_Notice how I skipped the delete step._

**Stream 2**

1. Now we are able to query for all relations that have two values instead of 1.
2. I am able to define which of these values is the new value by knowing which value we just added.
3. Then I define the second older value as another variable.
4. I can then delete the older variable, which leaves us with our desired output.

## Drawbacks

This method is also highly inefficient. First, it still requires two streams to be accomplished. Secondly, if there are normally more relations that already have attributes than the relations that are missing those attributes, then the second stream involves deleting from a majority of relations. The only benefit of this process is that we are able to exclude all values that were missing the attribute initially, leading to the second mutation always having to deal with fewer data.

## BlitzQL

I attempted to translate this TQL mutation into BlitzQL; however, I had difficulties learning the syntax based on only browsing through the libraries node_modules files and the mock folder from the first interface builder challenge I was given. I instead decided it would be best to wait for the opportunity to work alongside a developer at Blitz who would most likely be able to translate this into BlitzQL quite easily, as I am under the impression that anything you can do in TQL should be possible in BlitzQL.

## Closing Thoughts

In the end, what I find valuable about this exercise was that I learned a lot more about the nature of TypeDB and the syntax of TypeQL. I also learned a lot more about how to use TypeDB Studio and its useful tools for visualizing the data on their platform. While attempting to write the mutations in BlitzQL, I wound up finding ways to do other mutations that I hadn't intended to perform, which made it a sort of entertaining development process. I hope to continue to learn more about BlitzQL and its capabilities while working alongside more experienced Blitz developers.

Once again, thank you for this opportunity to learn more about what sorts of problems Blitz, as a company, is facing.
