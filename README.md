# 🛠️ Service Desk App – Internship Project Summary

Hi Mentor ,

This document provides a brief status update on the features implemented so far and clarifies two features — **file uploads (user pictures)** and **Razorpay integration** — that are currently pending due to external constraints.

---

## Features Implemented

### User Features
- **Raise Ticket**: Users can submit tickets with details like title, issue description, priority, and contact email.
- **Modify Ticket**: Users can edit existing tickets (if unresolved).
- **Delete Ticket**: Users can delete their own tickets with a confirmation prompt.
- **Priority Tagging**: Tickets show clear visual tags (High / Medium / Low)

###  Admin Features
- **Admin Dashboard**: A clean table-based view to monitor all tickets.
- **Resolve Ticket**: Admins can mark a ticket as Resolved.
- **Assign Ticket**: Admins can mark Open tickets as "In Progress".
- **Delete Ticket**: Admins can permanently delete any ticket.
- **Comment System**: Admins can now leave optional comments for users on each ticket.

---

##  Pending Features & Why They're Delayed

### File Upload (Images / Screenshots)
- **Status**: Not implemented yet.
- **Reason**: Firebase Storage is not free for sustained use — uploading and storing user images (even small ones) requires upgrading to a **Blaze Plan**, which involves a billing account.
- **Plan**: This feature can be re-enabled once project funding or billing access is approved.

### Razorpay Integration (for High Priority Payments)
- **Status**: Integration is partially implemented (checkout logic is in place).
- **Issue**: Razorpay requires valid **test/live API keys** and a verified business account (PAN, bank details, etc.).
- **Current Limitation**: Since PAN and other sensitive details are not provided, Razorpay checkout returns a `401 Unauthorized` error.
- **Plan**: Can be fully integrated once the Razorpay account setup is finalized and test/live keys are available.

---

##  Auth & Access Control
-  Authenticated routes are protected using Firebase Auth.
-  Admin detection is based on email pattern (`*_admin@`).
-  Logged-in users see feature cards on the dashboard; non-logged-in users see only Login/Register options.

---

##  To-Do (Future Enhancements)
- Firebase Storage integration for image uploads.
- Razorpay payment verification and backend receipt saving.
- Pagination and search for tickets.
- Email notifications on ticket updates (optional).


---

## Thanks & Summary
The app's core CRUD and role-based control systems are stable and tested. Blocking features (uploads/payments) are only awaiting external API account/billing setups and are easy to enable once infrastructure access is provided.

Thank you!

— Diksha
