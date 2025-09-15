import os
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import transforms, models

try:
    import medmnist
    from medmnist import BreastMNIST
except Exception:
    raise RuntimeError("Please install medmnist: pip install medmnist")

# Prepare BreastMNIST (binary classification)
data_flag = 'breastmnist'
download = True

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5])
])

train_dataset = BreastMNIST(split='train', download=download, transform=transform)
test_dataset = BreastMNIST(split='test', download=download, transform=transform)

train_loader = DataLoader(train_dataset, batch_size=64, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=64, shuffle=False)

# Use pretrained ResNet18, adapt for 1-channel input by repeating channel
base_model = models.resnet18(weights=models.ResNet18_Weights.DEFAULT)
base_model.conv1 = nn.Conv2d(1, 64, kernel_size=7, stride=2, padding=3, bias=False)
in_features = base_model.fc.in_features
base_model.fc = nn.Linear(in_features, 2)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
base_model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(base_model.parameters(), lr=1e-3)

epochs = 3
for epoch in range(epochs):
    base_model.train()
    running = 0.0
    for images, labels in train_loader:
        images = images.to(device)
        labels = labels.squeeze().long().to(device)
        optimizer.zero_grad()
        outputs = base_model(images)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()
        running += loss.item()
    print(f"Epoch {epoch+1}/{epochs} - loss: {running / max(1, len(train_loader)):.4f}")

# Export ONNX
os.makedirs("model", exist_ok=True)
dummy = torch.randn(1, 1, 224, 224, device=device)
torch.onnx.export(base_model, dummy, "model/cnn_model.onnx", input_names=["input"], output_names=["logits"], opset_version=12)

print("✅ BreastMNIST model trained and saved as ONNX!")
