 const form = document.getElementById("checkoutForm");
      const messageBox = document.getElementById("message");

      form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const card = form.card.value.trim();

        if (!name || !email.includes("@") || card.length !== 16 || isNaN(card)) {
          messageBox.textContent = "Please fill out all fields correctly.";
          messageBox.style.color = "red";
          return;
        }

        try {
          // Simulate successful checkout
          messageBox.textContent = "🌟 Your order has been placed successfully!";
          messageBox.style.color = "green";
        } catch (error) {
          messageBox.textContent = "⚠️ Something went wrong. Please try again.";
          messageBox.style.color = "red";
        }
      });