import asyncio
import os
import sys
from playwright.async_api import async_playwright

async def run_verification():
    print("Starting Playwright end-to-end training verification...")
    async with async_playwright() as p:
        # Launch browser headless
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1280, "height": 960})
        page = await context.new_page()

        # Direct navigation
        print("Navigating to WhiteFox local development server...")
        try:
            await page.goto("http://localhost:3000", timeout=10000)
        except Exception as e:
            # Start local server if not running
            print("Production server not responding, attempting to launch in background...")
            import subprocess
            subprocess.Popen(["node", "server/index.js"], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            await asyncio.sleep(2)
            await page.goto("http://localhost:3000", timeout=10000)

        # Login Screen
        print("Entering password verification step...")
        await page.fill("input[type='password']", "123456")
        await page.click("button[type='submit']")
        await page.wait_for_timeout(1000)

        # Confirm authorized panel loaded
        # Use first() to avoid strict mode violations
        assert await page.locator("text=白狐AI二").first.is_visible(), "Error: App title not visible!"
        print("Successfully logged in.")

        # Scroll down to training section
        print("Locating Interactive LoRA Training Area...")
        training_header = page.locator("text=LoRA 训练功能区").first
        await training_header.scroll_into_view_if_needed()
        assert await training_header.is_visible(), "Error: Training section title not found!"

        # Enter dummy training configs
        print("Configuring custom LoRA settings...")
        await page.fill("input[placeholder='e.g., retro-futuristic']", "magical-cyber-fox")
        await page.fill("input[placeholder='e.g., whitefox']", "cyberfox")

        # Capture initial training form state
        os.makedirs("/home/jules/verification", exist_ok=True)
        await page.screenshot(path="/home/jules/verification/training_initial.png")

        # Start simulated training
        print("Triggering simulated training pipeline...")
        await page.click("text=开始模拟 LoRA 精调训练")

        # Observe progress changes
        await page.wait_for_timeout(1500)
        await page.screenshot(path="/home/jules/verification/training_in_progress.png")
        print("Training state logs and decaying loss curve captured.")

        # Wait for simulation to finish completely (set to 35 seconds to allow full 18 second training loop)
        print("Waiting for training process and registration to complete...")
        await page.wait_for_selector("text=恭喜，LoRA 训练成功", timeout=35000)
        await page.screenshot(path="/home/jules/verification/training_success.png")

        # Confirm training success notice
        print("Verifying training completion notice...")
        success_msg = page.locator("text=恭喜，LoRA 训练成功").first
        assert await success_msg.is_visible(), "Error: Training completion banner missing!"
        print("Successfully verified: LoRA training process completed seamlessly.")

        await browser.close()
        print("E2E Playwright Training Verification Completed successfully with 0 errors!")

if __name__ == "__main__":
    asyncio.run(run_verification())
