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

        # Scroll to model hub search bar and search for our new trained model
        print("Verifying model registry integration in Internet Model Hub...")
        search_input = page.locator("input[placeholder='输入关键词搜索500条大模型...']")
        await search_input.scroll_into_view_if_needed()
        await search_input.fill("magical-cyber-fox")
        await page.wait_for_timeout(1500)
        await page.screenshot(path="/home/jules/verification/trained_model_hub_result.png")

        # Confirm new model is visible with appropriate badge
        # Specify span inside card to avoid matching hidden option tags in dropdowns
        target_model = page.locator("span").filter(has_text="magical-cyber-fox").first
        await target_model.wait_for(state="visible", timeout=5000)
        print("Successfully verified: Model registered perfectly in local storage model hub.")

        await browser.close()
        print("E2E Playwright Training Verification Completed successfully with 0 errors!")

if __name__ == "__main__":
    asyncio.run(run_verification())
