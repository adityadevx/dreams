import User from '@/models/User';
import dbConnection from '@/controllers/dbConnection';

async function updateDailyBonus() {
    try {
        // Find all users
        const users = await User.find({});

        // Iterate over each user
        for (const user of users) {
            let totalDailyBonus = 0;

            // Iterate over each plan of the user
            for (const plan of user.plans) {
                // Parse the daily bonus percentage from the plan
                const dailyBonusPercentage = parseFloat(plan.dailyBonus) || 0;

                // Calculate the daily bonus amount based on the price of the plan
                const planPrice = parseFloat(plan.price) || 0;
                const dailyBonusAmount = (planPrice / 100) * dailyBonusPercentage;

                // Add the daily bonus amount to the user's total daily bonus
                totalDailyBonus += dailyBonusAmount;
            }

            // Update the user's dailyBonus field with the calculated total
            user.dailyBonus = totalDailyBonus;

            // Save the updated user document
            await user.save();
        }

        console.log('Daily bonus update completed successfully.');
    } catch (error) {
        console.error('Error updating daily bonus:', error);
    }
}

// Establish database connection and call updateDailyBonus
(async () => {
    try {
        await dbConnection(); // Ensure the database connection is established before proceeding
        await updateDailyBonus(); // Update the daily bonus
    } catch (error) {
        console.error('Error establishing database connection or updating daily bonus:', error);
    }
})();
