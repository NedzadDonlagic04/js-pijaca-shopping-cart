let totalPrice=0;

//Function used to add purchases to the cart
function addToCart(element)
{
    //Using the previousElementSibling property I'll get the input tag before the button and then the value withing it
    //which in this case is the amount of items the user wants to purchase
    let input=element.previousElementSibling;
    let amount=parseInt(input.value);

    //If the amount is not bigger than 0 then we're not going to add anything since you can't purchase nothing
    if(amount>0)
    {
        //Using the closest method I'm going to find the closest div with the class .single-item
        //This is important because inside this class we have all the information (price,name etc)
        //about the item the user wishes to purchase
        let singleItemDiv=element.closest('.single-item');

        //Here I'm finding the p element inside which is the price of the item
        let p=singleItemDiv.querySelector('p');
        let priceStr=p.innerText;
        let priceInt=parseInt(priceStr.substring(1));

        //Calculating the total cost of the purchase
        let fullPrice=amount*priceInt;

        //Here I'm finding the h3 element inside which is the name of the item
        let itemName=singleItemDiv.querySelector('h3').innerText;

        //Finding the div inside which we're placing the div with results of the purchase
        let totalDiv=document.querySelector('.cart-items');
        
        //Creating a div element inside which the results will be stored in
        let singleTotalItem=document.createElement('div');
        singleTotalItem.setAttribute('class','cart-single-item');
        
        //Creating a h3 element which will hold the name of the item purchased
        //Same h3 element will go inside the previously created div for storing results
        let newH3=document.createElement('h3');
        newH3.innerText=itemName;
        singleTotalItem.appendChild(newH3);

        //Creating a p element which will hold the cost of the item purchased
        //Same p element will go inside the previously created div for storing results
        let newP=document.createElement('p');
        newP.innerText=`$${priceInt} x ${amount} = $`;

        //Creating a span element that will go inside the previously created p element
        //This element will hold the full price of the purchase which will be useful
        //when removing it from the cart
        let newSpan=document.createElement('span');
        newSpan.innerText=fullPrice;

        newP.appendChild(newSpan);
        singleTotalItem.appendChild(newP);

        //Creating a button element which will be used to undo the purchase
        //Same button element will go inside the previously created div for storing results
        let newBtn=document.createElement('button');
        newBtn.innerText='Ukloni';
        newBtn.setAttribute('onclick','removeFromCart(this)');
        singleTotalItem.appendChild(newBtn);

        //Adding the div that stores all the results inside the div that stores all the item purchase results
        totalDiv.appendChild(singleTotalItem);

        //Disabling the purchase button for the item
        element.setAttribute('disabled','true');

        //Adding the full price of the purchase to the total and updating it to the current value
        totalPrice+=fullPrice;
        document.querySelector('.total').innerText=`Total: $${totalPrice}`;

        //Changing the text of the button to reflect the item being added to the cart
        element.innerText='Dodano';
    }
}

//Function used to remove purchases to the cart
function removeFromCart(element)
{
    //Finding the price of the purchase we wish to remove
    let singleItemDiv=element.closest('.cart-single-item');
    let fullPrice=singleItemDiv.querySelector('span').innerText;

    //Removing the price from the total price
    totalPrice-=parseInt(fullPrice);

    if(totalPrice===0)
    {
        //If the total price is 0,the cart is empty,which means we can remove the text "Total" at the bottom
        document.querySelector('.total').innerText='';
    }
    else
    {
        //If the total price is not 0,the cart isn't empty,which means we have to update the current total cost
        //of everything inside the cart
        document.querySelector('.total').innerText=`Total: $${totalPrice}`;
    }

    //Finding the name of the item we wish to remove
    let itemName=singleItemDiv.querySelector('h3').innerText;

    //Selecting all the divs which represent the items that you are able to purchase
    let allH3Elements=document.querySelectorAll('.single-item');

    //Using a foreach method we are able to go through all the divs previously returned by the querySelectorAll method
    allH3Elements.forEach(
        function (items)
        {
            //Selecting the text inside the h3 element,the text is supposed to be the name of the item
            //which uniquely identifies it
            let h3Text=items.querySelector('h3').innerText;

            //Here we are comparing the names of the items,if they match we found the item the user wished to remove
            //from their shopping cart
            if(h3Text===itemName)
            {
                //Enabling the button for use again
                items.querySelector('button').removeAttribute('disabled');
                //Changing the inner text of the button to reflect it's current state
                items.querySelector('button').innerText='Dodaj';
                //Setting the input value back to 0
                items.querySelector('input').value=0;
            }
        }
    );

    //Removing the div that stores the information about the item in question
    singleItemDiv.remove();
}